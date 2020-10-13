/** Whether we are currently running on local host (according to the URL). */
export const isLocal = /localhost|127.0.0.1|0.0.0.0/.test(document.location.hostname)
