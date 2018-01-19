export default {
    entry: './index.js',
    dest: 'bundles/a4-overlay.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'a4-ovrlay',
    external: [
        '@angular/core',
        '@angular/common'
    ],
    globals: {
        '@angular/core': 'ng-core',
        '@angular/common': 'ng-common'
    }
}