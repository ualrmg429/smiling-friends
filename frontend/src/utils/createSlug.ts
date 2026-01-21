// Helper function to create slugs
export function createSlug(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') 
        .replace(/\s+/g, '-')      
        .replace(/--+/g, '-');     
}