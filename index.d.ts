declare module 'is-image-header' {
    interface IsImageResult {
        success: boolean;
        status: number | null | undefined;
        isImage: boolean | null;
        message: undefined | string;
    }

    function isImage(url: string): Promise<IsImageResult>;
    export default isImage;
}