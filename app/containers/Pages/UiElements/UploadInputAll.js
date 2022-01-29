import React, { Fragment } from 'react';
import { MaterialDropZone } from 'enl-components';

class UploadInputAll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  render() {
    const { files } = this.state;
    return (
      <Fragment>
        <div>
          <MaterialDropZone
            files={files}
            showPreviews
            maxSize={5000000}
            filesLimit={5}
            text="Drag and drop file(s) here or click"
            style={{ paddingTop: 100 }}
          />
        </div>
      </Fragment>
    );
  }
}

export default UploadInputAll;
