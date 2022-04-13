import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { TextField, Box, Button, MenuItem } from "@mui/material";

let renderCount = 0;

export default function InputFields({ control, register, errors, attributes }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'attributes'
    });

    renderCount++;

    return (
        <>
            <Box>
                {fields.map((item, index) => {
                    return (
                        <Box key={index} padding={1}>



                            <input
                                name={`attributes[${index}].attribute`}
                                ref={register()}
                                defaultValue={item.attribute.id}
                                type="hidden"
                            />

                            {/* <input
                                name={`attributes[${index}].attribute_name`}
                                ref={register()}
                                defaultValue={item.name}
                                type="hidden"
                            /> */}

                            <Controller
                                as={<TextField label={item.attribute.name} variant="outlined" maxWidth value={item.value} />}
                                name={`attributes[${index}].value`}
                                control={control}
                                mode="onBlur"
                                defaultValue={item.value}
                                style={{ width: '100%' }}
                            />



                            {/* <Button type="button" onClick={() => remove(index)}>
                                Delete
                            </Button> */}
                        </Box>
                    );
                })}
            </Box>

            {/* <Button
                type="button"
                onClick={() => {
                    append({ name: "append" });
                }}
            >
                Thêm
            </Button> */}

            <span className="counter">Render Count: {renderCount}</span>
        </>
    );
}
