import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  Unsubscribe,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import {
  ApprenticeRecord,
  EvaluationResult,
  InstructorRecord,
  KolbResult,
  RAPId,
  RapProgress,
} from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function makeSafeDocId(raw: string): string {
  const cleaned = raw.trim().replace(/[^a-zA-Z0-9_-]/g, '');
  if (cleaned.length > 0) {
    return cleaned.slice(0, 128);
  }
  return `APR-${Date.now()}`;
}

function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => stripUndefined(item)) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v !== undefined) {
        result[k] = stripUndefined(v);
      }
    }
    return result as T;
  }
  return value;
}

const APPRENTICES_COLLECTION = 'apprentices';
const INSTRUCTORS_COLLECTION = 'instructors';
const CERTIFICATES_COLLECTION = 'certificates';

export function subscribeToApprentices(
  onData: (apprentices: ApprenticeRecord[]) => void
): Unsubscribe {
  return onSnapshot(
    collection(db, APPRENTICES_COLLECTION),
    (snapshot) => {
      const records = snapshot.docs.map((d) => d.data() as ApprenticeRecord);
      records.sort((a, b) => {
        const dateA = a.updatedAt || a.registeredAt || '';
        const dateB = b.updatedAt || b.registeredAt || '';
        return dateB.localeCompare(dateA);
      });
      onData(records);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, APPRENTICES_COLLECTION);
    }
  );
}

export function subscribeToInstructors(
  onData: (instructors: InstructorRecord[]) => void
): Unsubscribe {
  return onSnapshot(
    collection(db, INSTRUCTORS_COLLECTION),
    (snapshot) => {
      const records = snapshot.docs.map((d) => d.data() as InstructorRecord);
      records.sort((a, b) => (b.registeredAt || '').localeCompare(a.registeredAt || ''));
      onData(records);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, INSTRUCTORS_COLLECTION);
    }
  );
}

export async function fetchInstructorsFromDb(): Promise<InstructorRecord[]> {
  try {
    const snap = await getDocs(collection(db, INSTRUCTORS_COLLECTION));
    const records = snap.docs.map((d) => d.data() as InstructorRecord);
    records.sort((a, b) => (b.registeredAt || '').localeCompare(a.registeredAt || ''));
    return records;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, INSTRUCTORS_COLLECTION);
  }
}

export function subscribeToCertificates(
  onData: (certificates: EvaluationResult[]) => void
): Unsubscribe {
  return onSnapshot(
    collection(db, CERTIFICATES_COLLECTION),
    (snapshot) => {
      const records = snapshot.docs.map((d) => d.data() as EvaluationResult);
      onData(records);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, CERTIFICATES_COLLECTION);
    }
  );
}

export async function getApprenticeFromDb(docNumberOrId: string): Promise<ApprenticeRecord | null> {
  const safeId = makeSafeDocId(docNumberOrId);
  const path = `${APPRENTICES_COLLECTION}/${safeId}`;
  try {
    const snap = await getDoc(doc(db, APPRENTICES_COLLECTION, safeId));
    if (snap.exists()) {
      return snap.data() as ApprenticeRecord;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function upsertApprenticeToDb(
  record: ApprenticeRecord,
  options?: { preserveExistingLocation?: boolean }
): Promise<ApprenticeRecord> {
  const safeId = makeSafeDocId(record.id || record.docNumber);
  const path = `${APPRENTICES_COLLECTION}/${safeId}`;
  const docRef = doc(db, APPRENTICES_COLLECTION, safeId);

  try {
    const existingSnap = await getDoc(docRef);
    const nowIso = new Date().toISOString();

    if (existingSnap.exists()) {
      const existingData = existingSnap.data() as ApprenticeRecord;
      const preserveLocation = options?.preserveExistingLocation === true;
      const nextCenter = preserveLocation && existingData.center
        ? existingData.center
        : (record.center.trim() || existingData.center || 'Centro de Servicios y Gestión Empresarial');
      const nextRegional = preserveLocation && existingData.regional
        ? existingData.regional
        : (record.regional.trim() || existingData.regional || 'Regional Antioquia');

      const merged: ApprenticeRecord = stripUndefined({
        ...existingData,
        ...record,
        id: existingData.id,
        registeredAt: existingData.registeredAt,
        fullName: (record.fullName.trim() || existingData.fullName).slice(0, 150),
        docType: record.docType || existingData.docType,
        docNumber: (record.docNumber.trim() || existingData.docNumber).slice(0, 40),
        ficha: (record.ficha.trim() || existingData.ficha).slice(0, 30),
        center: nextCenter.trim().slice(0, 160),
        regional: nextRegional.trim().slice(0, 100),
        kolbResult: record.kolbResult !== undefined && record.kolbResult !== null
          ? record.kolbResult
          : existingData.kolbResult ?? null,
        rapsProgress: record.rapsProgress || existingData.rapsProgress,
        attemptsCountByRap: record.attemptsCountByRap || existingData.attemptsCountByRap,
        totalAttempts: record.totalAttempts !== undefined ? record.totalAttempts : existingData.totalAttempts,
        lastResult: record.lastResult !== undefined ? record.lastResult : existingData.lastResult,
        updatedAt: nowIso,
      });

      const updateFields = stripUndefined({
        fullName: merged.fullName,
        docType: merged.docType,
        docNumber: merged.docNumber,
        ficha: merged.ficha,
        center: merged.center,
        regional: merged.regional,
        kolbResult: merged.kolbResult ?? null,
        ...(merged.rapsProgress ? { rapsProgress: merged.rapsProgress } : {}),
        ...(merged.attemptsCountByRap ? { attemptsCountByRap: merged.attemptsCountByRap } : {}),
        ...(merged.totalAttempts !== undefined ? { totalAttempts: merged.totalAttempts } : {}),
        ...(merged.lastResult !== undefined ? { lastResult: merged.lastResult } : {}),
        updatedAt: nowIso,
      });

      await updateDoc(docRef, updateFields);
      return merged;
    } else {
      const created: ApprenticeRecord = stripUndefined({
        ...record,
        id: safeId,
        fullName: record.fullName.trim().slice(0, 150),
        docNumber: record.docNumber.trim().slice(0, 40),
        ficha: record.ficha.trim().slice(0, 30),
        center: (record.center || 'Centro de Servicios y Gestión Empresarial').trim().slice(0, 160),
        regional: (record.regional || 'Regional Antioquia').trim().slice(0, 100),
        registeredAt: (record.registeredAt || new Date().toLocaleDateString('es-CO')).slice(0, 40),
        kolbResult: record.kolbResult ?? null,
        updatedAt: nowIso,
      });

      await setDoc(docRef, created);
      return created;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateApprenticeKolbInDb(
  docNumberOrId: string,
  kolbResult: KolbResult | null
): Promise<void> {
  const safeId = makeSafeDocId(docNumberOrId);
  const path = `${APPRENTICES_COLLECTION}/${safeId}`;
  try {
    await updateDoc(doc(db, APPRENTICES_COLLECTION, safeId), stripUndefined({
      kolbResult,
      updatedAt: new Date().toISOString(),
    }));
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function updateApprenticeProgressInDb(
  docNumberOrId: string,
  rapsProgress: Record<RAPId, RapProgress>,
  lastResult?: EvaluationResult | null
): Promise<void> {
  const safeId = makeSafeDocId(docNumberOrId);
  const path = `${APPRENTICES_COLLECTION}/${safeId}`;
  try {
    const payload: Record<string, unknown> = {
      rapsProgress,
      updatedAt: new Date().toISOString(),
    };
    if (lastResult !== undefined) {
      payload.lastResult = lastResult;
    }
    await updateDoc(doc(db, APPRENTICES_COLLECTION, safeId), stripUndefined(payload));
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteApprenticeFromDb(docNumberOrId: string): Promise<void> {
  const safeId = makeSafeDocId(docNumberOrId);
  const path = `${APPRENTICES_COLLECTION}/${safeId}`;
  try {
    await deleteDoc(doc(db, APPRENTICES_COLLECTION, safeId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function upsertInstructorToDb(
  instructor: InstructorRecord
): Promise<InstructorRecord> {
  const safeId = makeSafeDocId(instructor.id || `INST-${instructor.docNumber}`).slice(0, 64);
  const path = `${INSTRUCTORS_COLLECTION}/${safeId}`;
  const docRef = doc(db, INSTRUCTORS_COLLECTION, safeId);
  const sanitizedFichas = Array.from(
    new Set(instructor.fichas.map((f) => f.trim()).filter((f) => f.length > 0))
  ).slice(0, 50);

  if (sanitizedFichas.length === 0) {
    throw new Error('El instructor debe tener al menos una ficha asignada.');
  }

  const sanitizedFields = {
    fullName: instructor.fullName.trim().slice(0, 150),
    docNumber: instructor.docNumber.trim().slice(0, 40),
    username: instructor.username.trim().toLowerCase().slice(0, 120),
    password: instructor.password.trim().slice(0, 120),
    fichas: sanitizedFichas,
  };

  try {
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const existingData = snap.data() as InstructorRecord;
      await updateDoc(docRef, stripUndefined(sanitizedFields));
      return stripUndefined({
        ...existingData,
        ...sanitizedFields,
        id: existingData.id,
        registeredAt: existingData.registeredAt,
      });
    } else {
      const created: InstructorRecord = stripUndefined({
        id: safeId,
        ...sanitizedFields,
        registeredAt: (instructor.registeredAt || new Date().toLocaleDateString('es-CO')).slice(0, 40),
      });
      await setDoc(docRef, created);
      return created;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteInstructorFromDb(instructorId: string): Promise<void> {
  const safeId = makeSafeDocId(instructorId);
  const path = `${INSTRUCTORS_COLLECTION}/${safeId}`;
  try {
    await deleteDoc(doc(db, INSTRUCTORS_COLLECTION, safeId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function saveCertificateToDb(cert: EvaluationResult): Promise<void> {
  const safeId = makeSafeDocId(cert.certificateId);
  const path = `${CERTIFICATES_COLLECTION}/${safeId}`;
  const docRef = doc(db, CERTIFICATES_COLLECTION, safeId);
  try {
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      await setDoc(docRef, stripUndefined({
        ...cert,
        certificateId: safeId,
      }));
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function seedInitialDataIfNeeded(
  defaultApprentices: ApprenticeRecord[],
  defaultInstructors: InstructorRecord[],
  localInstructorsToMigrate: InstructorRecord[] = []
): Promise<void> {
  try {
    const appSnap = await getDocs(query(collection(db, APPRENTICES_COLLECTION), limit(1)));
    if (appSnap.empty) {
      for (const app of defaultApprentices) {
        const safeId = makeSafeDocId(app.id || app.docNumber);
        await setDoc(
          doc(db, APPRENTICES_COLLECTION, safeId),
          stripUndefined({ ...app, id: safeId })
        );
      }
    }

    const existingInstSnap = await getDocs(collection(db, INSTRUCTORS_COLLECTION));
    const existingIds = new Set(existingInstSnap.docs.map((d) => d.id));

    if (existingInstSnap.empty) {
      for (const inst of defaultInstructors) {
        const safeId = makeSafeDocId(inst.id).slice(0, 64);
        await setDoc(
          doc(db, INSTRUCTORS_COLLECTION, safeId),
          stripUndefined({ ...inst, id: safeId })
        );
        existingIds.add(safeId);
      }
    }

    for (const localInst of localInstructorsToMigrate) {
      const safeId = makeSafeDocId(localInst.id || `INST-${localInst.docNumber}`).slice(0, 64);
      if (!existingIds.has(safeId)) {
        const sanitizedFichas = Array.from(
          new Set(localInst.fichas.map((f) => f.trim()).filter((f) => f.length > 0))
        ).slice(0, 50);
        if (
          sanitizedFichas.length > 0 &&
          localInst.fullName.trim() &&
          localInst.docNumber.trim() &&
          localInst.username.trim() &&
          localInst.password.trim()
        ) {
          await setDoc(
            doc(db, INSTRUCTORS_COLLECTION, safeId),
            stripUndefined({
              id: safeId,
              fullName: localInst.fullName.trim().slice(0, 150),
              docNumber: localInst.docNumber.trim().slice(0, 40),
              username: localInst.username.trim().toLowerCase().slice(0, 120),
              password: localInst.password.trim().slice(0, 120),
              fichas: sanitizedFichas,
              registeredAt: (localInst.registeredAt || new Date().toLocaleDateString('es-CO')).slice(0, 40),
            })
          );
          existingIds.add(safeId);
        }
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, INSTRUCTORS_COLLECTION);
  }
}
