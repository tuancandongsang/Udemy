export default {
    data() {
        return {
            srcFilePdf: '',
            showDialogViewPdf: false,
            loading: false,
            iconPdf: require('@/assets/icons/pdf.svg'),
            iconDoc: require('@/assets/icons/doc.svg'),
            iconXls: require('@/assets/icons/xls.svg'),
            iconPng: require('@/assets/icons/png.svg'),
            iconTxt: require('@/assets/icons/txt.svg'),
            iconMsg: require('@/assets/icons/msg.svg'),
            iconZip: require('@/assets/icons/zip.svg'),
            iconRar: require('@/assets/icons/rar.svg'),
            iconJpg: require('@/assets/icons/jpg.svg')
        }
    },
    methods: {
        getIconFile(fileName) {
            if (fileName) {
                const extFile = fileName
                    .split('.')
                    .pop()
                    .toLowerCase()
                var icon = ''
                switch (extFile) {
                    case 'pdf':
                        icon = this.iconPdf
                        break
                    case 'doc':
                    case 'docx':
                        icon = this.iconDoc
                        break

                    case 'csv':
                    case 'xls':
                    case 'xlsx':
                        icon = this.iconXls
                        break
                    case 'jpg':
                        icon = this.iconJpg
                        break
                    case 'png':
                        icon = this.iconPng
                        break
                    case 'txt':
                        icon = this.iconTxt
                        break
                    case 'msg':
                        icon = this.iconMsg
                        break
                    case 'zip':
                        icon = this.iconZip
                        break
                    case 'rar':
                        icon = this.iconRar
                        break
                    default:
                        icon = this.iconPdf
                        break
                }
                return icon
            }
        },
        // Hien thi ten file
        customFileName(file) {
            const fileName = file.name || file.fileName
            const fileSizeInput = file.size || file.fileSize
            const size = fileSizeInput / 1000

            var names = fileName.split('.')
            const extFile = names[names.length - 1]
            var name = names.splice(0, names.length - 1).join('')
            if (name.length > 25) {
                name = `${name.slice(0, 12)}...${name.slice(
                    15,
                    25
                )}.${extFile} (${size})`
            } else {
                name += `.${extFile} (${size})`
            }
            return name
        },
        trimSpace(val) {
            const value = val ? val.toString().trim() : ''
            return value
        },

    }
}
