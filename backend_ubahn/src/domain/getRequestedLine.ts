import { Line } from "./Line";

/**
 * @returns a requested line
 */

export function getRequestedLine(
    requestedLineId: string,
    lines: Line[]
): Line | undefined {
    const requestedLine: Line | undefined = lines.find((line) => line.name === requestedLineId);
    return requestedLine;
}
