import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Downshift from "downshift";


interface ChipsProps {
    selectedTags: (tags: Array<string>) => unknown;
    tags: Array<string>;
}
export const ChipsInput: React.FC<TextFieldProps & ChipsProps> = ({ selectedTags, tags , ...other }) => {
    const [inputValue, setInputValue] = React.useState("");
    const [selectedItem, setSelectedItem] = React.useState<Array<string>>(tags);
    // useEffect(() => {
    //     setSelectedItem(tags);
    // }, [tags]);
    useEffect(() => {
        selectedTags(selectedItem);
    }, [selectedItem, selectedTags]);

    const handleKeyDownCb = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const value = (event.target as HTMLInputElement)['value'] || '';
            const newSelectedItem = [...selectedItem];
            const duplicatedValues = newSelectedItem.indexOf(
                value.trim()
            );

            if (duplicatedValues !== -1) {
                setInputValue("");
                return;
            }
            if (!value.replace(/\s/g, "").length) return;

            newSelectedItem.push(value.trim());
            setSelectedItem(newSelectedItem);
            setInputValue("");
        }
        if (
            selectedItem.length &&
            !inputValue.length &&
            event.key === "Backspace"
        ) {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    };

    const handleChange = (item: string|null) => {
        let newSelectedItem = [...selectedItem];
        if (item && newSelectedItem.indexOf(item) === -1) {
            newSelectedItem = [...newSelectedItem, item];
        }
        setInputValue("");
        setSelectedItem(newSelectedItem);
    }

    const handleDelete = (item: string) => () => {
        const newSelectedItem = [...selectedItem];
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
        setSelectedItem(newSelectedItem);
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        setInputValue(event.target.value);
    }
    return (
        <React.Fragment>
             <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={handleChange}
                selectedItem={selectedItem as unknown as string}
            >
                {({ getInputProps }) => {
                    const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                        onKeyDown: handleKeyDownCb,
                        // placeholder
                    }) as TextFieldProps;
                    return (
                        <div>
                            <TextField
                                InputProps={{
                                    startAdornment: selectedItem.map(item => (
                                        <Chip
                                            style={{ margin: '4px' }}
                                            key={item}
                                            tabIndex={-1}
                                            label={item}
                                            className={'chip'}
                                            onDelete={handleDelete(item)}
                                        />
                                    )),
                                    onBlur,
                                    onChange: event => {
                                        handleInputChange(event);
                                        onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
                                    },
                                    onFocus
                                }}
                                {...other}
                                {...inputProps}
                            />
                        </div>
                    );
                }}
            </Downshift>
        </React.Fragment>
    );
}
// TagsInput.defaultProps = {
//   tags: []
// };
// TagsInput.propTypes = {
//   selectedTags: PropTypes.func.isRequired,
//   tags: PropTypes.arrayOf(PropTypes.string)
// };
