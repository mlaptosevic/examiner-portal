import go from 'gojs';

export const createNodeTemplates = (setActiveEntity, setFieldModal) => {
    const $ = go.GraphObject.make;

    return $(
        go.Node,
        'Auto',
        // Shape of entity
        $(go.Shape, {
            figure: 'RoundedRectangle',
            fill: '#f1f1f1'
        }),
        $(
            go.Panel,
            'Vertical',
            // Entity name
            $(
                go.TextBlock,
                { margin: 5, width: 80, textAlign: 'center', font: '15px sans-serif' },
                new go.Binding('text', 'entity')
            ),
            // $(go.Shape, "MinusLine", { width: 80, margin: 4, fill: null }),
            $(go.Shape, { geometryString: 'M0 0 H80', fill: 'lightgreen', margin: 5 }),
            $(
                go.Panel,
                'Vertical',

                new go.Binding('itemArray', 'fields'),
                {
                    // Design of field
                    itemTemplate: $(
                        go.Panel,
                        'Auto',
                        { margin: 2 },
                        $(go.TextBlock, new go.Binding('text', ''), { width: 80, margin: 2 })
                    )
                }
            ),
            // Button for adding new field
            $(
                'Button',
                {
                    margin: 2,
                    alignment: go.Spot.Right,
                    click: (e, obj) => {
                        if (obj.part && obj.part.data) {
                            setActiveEntity(obj.part.data.key);
                            setFieldModal(true);
                        }
                    }
                },
                $(go.TextBlock, '+')
            )
        )
    );
};

export const createLinkTemplates = () => {
    const $ = go.GraphObject.make;

    return $(go.Link, $(go.Shape));
};
