export interface Node {
    entity: string;
    key: string;
    fields: string[];
}

export interface Link {
    from: string;
    to: string;
}

export interface EntityDto {
    type: string;
    name: string;
    attributes: Array<{
        name: string;
        isPrimaryKey: boolean;
        isForeignKey: boolean;
    }>;
}

export interface RelationshipDto {
    type: string;
    relationshipEdge: Array<{
        entity: EntityDto;
    }>;
}

export const convertGraphObjectToERModelElement = (data: Node & Link) => {
    if (!data) {
        console.error('Cannot convert to ER Element, data is not defined');
        return {};
    }
    // if Node
    if (data.entity) {
        const attributes = data.fields.map(field => {
            return {
                name: field,
                isPrimaryKey: false,
                isForeignKey: false
            };
        });
        console.log(data.entity + ' ' + data.fields);
        return {
            type: 'entity',
            name: data.entity,
            attributes: attributes
        };
    }

    if (data.from) {
        console.log(data.from + ' -> ' + data.to);
    }

    return {};
};
