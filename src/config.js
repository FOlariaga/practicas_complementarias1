import * as url from 'url';

const config = {
    SERVER: "atlas",
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
    MONGODB_URI: "mongodb+srv://FOlariaga:QNxt9FsbrAm0XFHz@clustercoder53160fo.hnz3aid.mongodb.net/ecommerce"
}

export default config;