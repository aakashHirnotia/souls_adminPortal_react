import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { CardColumns } from 'reactstrap';

class TextEditor extends Component {
    constructor() {
        super();
        this.state = {
            value: ""
        };
    }

    onChange= ( event, editor ) => {
        const data = editor.getData();
        this.props.onChange(data);
        
    } 

     render () {
        return (
            <div className="container">
                <CKEditor
                    editor={ ClassicEditor }
                    onChange={this.onChange}
                />
            </div>
        );
     }

}
export default TextEditor;