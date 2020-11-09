import React, { FC } from 'react';
import './TabPanel.css'

type TabPanelProps = {
    children?: React.ReactNode;
    value: number;
    index: number;
}

const TabPanel: FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div className="tab-panel"
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <div>{children}</div>

            )}
        </div>
    );
}

export default TabPanel;