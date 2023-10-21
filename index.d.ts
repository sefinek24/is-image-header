declare module 'is-image-header' {
    interface IsImageResult {
        success: boolean;
        code: number;
        isImage: boolean;
    }

    function isImage(url: string): Promise<IsImageResult>;
    export = isImage;
}