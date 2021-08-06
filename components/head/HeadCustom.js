/*
  NOTE: This modifies next.js internal api behavior and may break your application.
  Tested on next.js version: 9.2.1
*/
import React from 'react';
import { Head } from 'next/document';

class HeadCustom extends Head {
    getCssLinks(files) {
        const { assetPrefix, devOnlyCacheBusterQueryString, } = this.context;
        const normalScripts = files.allFiles.filter((file) => file.endsWith('.css'));
        return [...normalScripts].map((file) => {
            return (
                <link
                key={file}
                src={`${assetPrefix}/_next/${encodeURI( file )}${devOnlyCacheBusterQueryString}`}
                nonce={this.props.nonce}
                rel='preload'
                as='style'
                />
            );
        });
    }
}
export default HeadCustom;