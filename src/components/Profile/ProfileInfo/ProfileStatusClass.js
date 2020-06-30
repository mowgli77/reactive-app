import React from "react";
import s from "./ProfileStatus.module.css"


class ProfileStatusClass extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    onEditStatus = () => {
        this.setState({
            editMode: true
        })
    }
    offEditStatus = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatusThunk(this.state.status);
    }

    changeText = (e) => {
        let text = e.currentTarget.value;
        this.setState({
            status: text
        })
    }

    offChanging = () => {
        this.setState({
            editMode: false,
            status: this.props.status
        })
    }
    pressKey = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            if (this.state.status.trim().length > 0){
            this.offEditStatus()
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return <div>
            {!this.state.editMode &&
            <div className={s.status}>
                <span onClick={this.onEditStatus}>{this.props.status || 'No status'}</span>
            </div>}
            {this.state.editMode &&
            <div className={s.status}>
                <input onKeyPress={this.pressKey} onChange={this.changeText} autoFocus={true} value={this.state.status}/>
                <div>
                    <button onClick={this.offEditStatus}>Add status</button>
                    <button onClick={this.offChanging}>Don`t change status</button>
                </div>
            </div>}
        </div>
    }
}

export default ProfileStatusClass;
