import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'grreenhorznwalkks_saved_location_ids_v1';

export async function grreenhorznwalkksGetSavedLocationIds() {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(x => typeof x === 'string');
  } catch {
    return [];
  }
}

export async function grreenhorznwalkksSetSavedLocationIds(ids: string[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(ids));
}

export async function grreenhorznwalkksIsLocationSaved(locationId: string) {
  const ids = await grreenhorznwalkksGetSavedLocationIds();
  return ids.includes(locationId);
}

export async function grreenhorznwalkksToggleSavedLocation(locationId: string) {
  const ids = await grreenhorznwalkksGetSavedLocationIds();
  const isSaved = ids.includes(locationId);
  const next = isSaved ? ids.filter(id => id !== locationId) : [...ids, locationId];
  await grreenhorznwalkksSetSavedLocationIds(next);
  return {isSaved: !isSaved, ids: next};
}

export async function grreenhorznwalkksRemoveSavedLocation(locationId: string) {
  const ids = await grreenhorznwalkksGetSavedLocationIds();
  const next = ids.filter(id => id !== locationId);
  await grreenhorznwalkksSetSavedLocationIds(next);
  return next;
}

