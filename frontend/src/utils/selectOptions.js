// Convert API categories into Select component options

export function mapCategoriesToOptions(categories = []) {
    return categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));
}