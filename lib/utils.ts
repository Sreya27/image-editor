export function downloadUri (uri: string | undefined, name: string) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function mapUserInputToContrastValue(input: number) {
    return (2*input - 100); 
}

export function mapUserInputToBrightnessValue(input: number) {
    return (0.02*input - 1);
}

export function mapUserInputToSaturationValue(input: number) {
    return (0.02*input - 1.0);
}