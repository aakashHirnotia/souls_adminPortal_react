import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import wysiwygarea from '@ckeditor/ckeditor5-wysiwygarea/src/wysiwygarea';

// CKEditor.editorConfig = function (config){
//     config.fullPage = true;  
//     config.allowedContent = true;
// }

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
                    // config={{
                    //     plugins: [wysiwygarea]
                    // }}
                    onChange={this.onChange}
                    // config={{
                    //     fullPage: true,
                    //     allowedContent: true
                    //   }}
                />
            </div>
        );
     }

}
export default TextEditor;