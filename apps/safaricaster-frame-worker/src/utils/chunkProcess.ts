type AsyncFunction<T, R> = (chunk: T[]) => Promise<R[]>

export const chunkProcess = async <T, R>(
  array: T[],
  chunkSize: number,
  asyncFn: AsyncFunction<T, R>,
): Promise<R[]> => {
  const results: R[] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    // Collect return values from the async function
    const chunkResults = await asyncFn(chunk)
    results.push(...chunkResults) // Use spread operator to add elements to results array
  }
  return results // Return the combined results from all chunks
}
