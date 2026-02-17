export function useComponentState (sourceData: Record<string, any>) {
  const initialState = structuredClone(toRaw(sourceData))

  const setDefaultState = (excluded: string[] = []) => {
    for (const key of Object.keys(initialState)) {
      if (excluded.includes(key)) {
        continue
      }

      const current = sourceData[key]
      const initial = initialState[key]

      if (isRef(current)) {
        current.value = structuredClone(initial)
      } else if (isReactive(current)) {
        Object.assign(current, structuredClone(initial))
      } else {
        sourceData[key] = structuredClone(initial)
      }
    }
  }

  return { setDefaultState }
}
