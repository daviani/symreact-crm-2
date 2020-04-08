
import React from "react";
import ContentLoader from "react-content-loader";

const FormContentLoader = props => (
    <ContentLoader
        height={400}
        width={600}
        speed={2}
        backgroundColor="#c9c9c9"
        foregroundColor="#ebeaec"
        {...props}
    >
        <rect x="0" y="15" rx="5" ry="5" width="151" height="15" />
        <rect x="0" y="35" rx="5" ry="5" width="719" height="25" />
        <rect x="0" y="80" rx="5" ry="5" width="151" height="15" />
        <rect x="0" y="105" rx="5" ry="5" width="719" height="25" />
        <rect x="0" y="150" rx="5" ry="5" width="151" height="15" />
        <rect x="0" y="175" rx="5" ry="5" width="719" height="25" />
        <rect x="0" y="220" rx="5" ry="5" width="151" height="15" />
        <rect x="0" y="245" rx="5" ry="5" width="719" height="25" />
        <rect x="0" y="290" rx="5" ry="5" width="130" height="30" />
    </ContentLoader>
);

export default FormContentLoader;