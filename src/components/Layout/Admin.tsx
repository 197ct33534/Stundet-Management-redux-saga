import React from 'react';

export const AdminLayout = () => {
    console.log('AdminLayout didmount');

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                gridTemplateColumns: '300px 1fr',
                gridTemplateAreas: `"header header" "sidebar main"`,
                minHeight: '100vh',
            }}
        >
            <div style={{ gridArea: 'header', borderBottom: `1px solid black` }}>header</div>
            <div
                style={{
                    gridArea: 'sidebar',
                    borderLeft: `1px solid black`,
                }}
            >
                slibar
            </div>
            <div style={{ gridArea: 'main' }}>main</div>
        </div>
    );
};
