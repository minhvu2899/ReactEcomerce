import React from "react";
import { Controller } from "react-hook-form";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({

    root: {
        border: '1px solid #ccc',
    },
    editer: {
        height: '200px !important',
        border: '1px solid #F1F1F1 !important',
        padding: '5px !important',
        borderRadius: '2px !important',
    }

}));
function RichText({ control, name }) {
    const classes = useStyles()
    return (
        <div
            style={{
                border: "1px solid #ccc",
                minHeight: 30,
                padding: 10
            }}
        >
            <Controller
                name={name}
                control={control}
                render={({ value, onChange }) => {
                    return <Editor editorState={value} onEditorStateChange={onChange} toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName={`editorClassName ${classes.editer}`} />;
                }}
                defaultValue={EditorState.createEmpty()}
            />
        </div>
    );
}

export default RichText;