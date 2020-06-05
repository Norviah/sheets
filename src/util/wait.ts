/**
 * Pauses the main thread for the given amount of time, in milliseconds.
 * @param  duration Represents how long to pause the main thread for.
 */
function wait(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export { wait };
