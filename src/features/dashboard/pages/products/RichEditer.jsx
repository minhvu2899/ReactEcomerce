import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import { unEscape } from 'utils';


export default function RichEditer({ name, form }) {

    const handelChange = (e) => {
        form.setValue('description', e.target.getContent())
    };

    return (
        <>
            <Controller
                name={name}
                control={form.control}
                render={({ field }) => {
                    console.log(field)
                    return <Editor
                        apiKey="yem4hth7396uz8ger91p6vmhi8dqypicplgyv75zjmwgvphn"
                        initialValue={(field.value && unEscape(field.value)) || "<p>Nhập thông tin mô tả sản phẩm....</p>"}

                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onChange={handelChange}

                    />

                }}

            />


        </>
    );
}