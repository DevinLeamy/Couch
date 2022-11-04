import React from "react"
import ChairIcon from '@mui/icons-material/Chair';

const HeaderComponent = () => {
    return (
        <div className="header-container">
            <div className="header-text">
                Couches
            </div>
            <ChairIcon className="header-icon" fontSize={"large"} />
        </div>
    )
}

export default HeaderComponent
