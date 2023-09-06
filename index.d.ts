interface IsImageURLResponse {
    success: boolean;
    code: number;
    isImage: boolean | null;
    message?: string;
}

declare function isImageURL(url: string): Promise<IsImageURLResponse>;

export = isImageURL;