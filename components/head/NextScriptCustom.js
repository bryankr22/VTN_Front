import { NextScript } from 'next/document';

class NextScriptCustom extends NextScript {
    getDynamicChunks(files) {
        const { dynamicImports, assetPrefix, isDevelopment, devOnlyCacheBusterQueryString } = this.context;
        (dynamicImports).map((bundle) => {
            if (!bundle.file.endsWith('.js') || files.allFiles.includes(bundle.file))
                return null;
            return (
                <script
                    defer={!isDevelopment}
                    key={bundle.file}
                    src={`${assetPrefix}/_next/${encodeURI(bundle.file)}${devOnlyCacheBusterQueryString}`}
                    nonce={this.props.nonce}
                    crossOrigin={this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN}
                />
            );
        })
    }
    getScripts(files) {
        const { assetPrefix, buildManifest, isDevelopment, devOnlyCacheBusterQueryString, } = this.context;
        const normalScripts = files.allFiles.filter((file) => file.endsWith('.js'));
        const lowPriorityScripts = buildManifest.lowPriorityFiles?.filter((file) => file.endsWith('.js'));
        return [...normalScripts, ...lowPriorityScripts].map((file) => {
            return (
                <script
                    key={file}
                    src={`${assetPrefix}/_next/${encodeURI(file)}${devOnlyCacheBusterQueryString}`}
                    nonce={this.props.nonce}
                    defer={!isDevelopment}
                    crossOrigin={this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN}
                />
            );
        });

    }
}

export default NextScriptCustom;