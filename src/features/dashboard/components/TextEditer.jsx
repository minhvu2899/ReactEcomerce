import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useEffect } from 'react';
import { makeStyles } from '@mui/material';
import { useLayoutEffect } from 'react';
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

function TextEditer({ form, name, value }) {
    const { setValue } = form;
    const { getValues } = form;
    const [text, setText] = React.useState('')

    // const contentState = ContentState.createFromBlockArray(htmlToDraft(text).contentBlocks);

    // const editorStateText = EditorState.createWithContent(contentState);
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createWithContent(text),
    );
    const classes = useStyles()
    useEffect(() => {
        if (editorState) {
            setValue(name, draftToHtml(convertToRaw(editorState.getCurrentContent())))

        }

    }, [editorState, setValue, name])
    useEffect(() => {
        if (getValues(name)) {
            setText(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(text).contentBlocks)))

        }
        else {
            setText(() => EditorState.createEmpty())
        }

    }, [editorState, setValue, name, getValues, text])

    console.log(htmlToDraft(text))
    const handleChange = (editorState) => {
        setEditorState(editorState)
    }
    // console.log(editorStates)
    console.log(editorState)
    // useEffect(() => {
    //     if (editorStateText) {
    //         setEditorState()
    //     }
    // }, [editorStateText])
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    return <div className={classes.root}>
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName={`editorClassName ${classes.editer}`}
            onEditorStateChange={handleChange}
        // defaultEditorState={editorStateText}
        // contentState={contentState}

        />
        <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
    </div>;
}

export default TextEditer;