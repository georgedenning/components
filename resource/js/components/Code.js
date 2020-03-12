import $ from 'jquery';

export default class Code {
    
    /**
     * Create a new Code instance
     * @param {HTMLObject} code 
     */
    constructor(code) {
        this.code = code;
        this.patterns = {
            js: {
                number: {
                    regex: "(\\b\\d*\\.?\\d+\\b)",
                    wrapGroup: 1
                },
                variable: {
                    regex: "(\\.)([a-zA-Z_][\\w-]*)\\b",
                    wrapGroup: 2
                },
                function: {
                    regex: "(\\b[a-zA-Z_][\\w-]+?(?= *\\())",
                    wrapGroup: 1
                },
                keyword: {
                    regex: [
                        "(\\bdo\\b)",
                        "(\\bif\\b)",
                        "(\\bin\\b)",
                        "(\\bfor\\b)",
                        "(\\blet\\b)",
                        "(\\bnew\\b)",
                        "(\\btry\\b)",
                        "(\\bvar\\b)",
                        "(\\bcase\\b)",
                        "(\\belse\\b)",
                        "(\\benum\\b)",
                        "(\\beval\\b)",
                        "(\\bthis\\b)",
                        "(\\bvoid\\b)",
                        "(\\bwith\\b)",
                        "(\\bawait\\b)",
                        "(\\bbreak\\b)",
                        "(\\bcatch\\b)",
                        "(\\bclass\\b)",
                        "(\\bconst\\b)",
                        "(\\bsuper\\b)",
                        "(\\bthrow\\b)",
                        "(\\bwhile\\b)",
                        "(\\byield\\b)",
                        "(\\bdelete\\b)",
                        "(\\bexport\\b)",
                        "(\\bimport\\b)",
                        "(\\bpublic\\b)",
                        "(\\breturn\\b)",
                        "(\\bstatic\\b)",
                        "(\\bswitch\\b)",
                        "(\\btypeof\\b)",
                        "(\\bdefault\\b)",
                        "(\\bextends\\b)",
                        "(\\bfinally\\b)",
                        "(\\bpackage\\b)",
                        "(\\bprivate\\b)",
                        "(\\bcontinue\\b)",
                        "(\\bdebugger\\b)",
                        "(\\bfunction\\b)",
                        "(\\barguments\\b)",
                        "(\\binterface\\b)",
                        "(\\bprotected\\b)",
                        "(\\bimplements\\b)",
                        "(\\binstanceof\\b)",
                    ],
                    wrapGroup: 1
                }
            }
        }
    }

    highlight() {
        let parsed = this.code.innerHTML;
        parsed = parsed.replace(/\</g, '&lt;');
        parsed = parsed.replace(/\>/g, '&gt;');
        parsed = parsed.replace(/\"/g, '&quot;');
        parsed = parsed.replace(/\'/g, '&apos;');
        parsed = parsed.replace(/\//g, '&sol;');

        Object.keys(this.patterns.js).forEach((type) => {
            const item = this.patterns.js[type];

            const prependGroup = item.prependGroup ? '$' + item.prependGroup : '';
            const wrapGroup = item.wrapGroup ? '<span class="js-' + type + '">$' + item.wrapGroup + '</span>' : '';
            const appendGroup = item.appendGroup ? '$' + item.appendGroup : '';

            if (typeof item.regex === 'string') {
                item.regex = [item.regex];
            }

            item.regex.forEach(regex => {
                parsed = parsed.replace(
                    new RegExp(regex, 'gm'),
                    prependGroup + wrapGroup + appendGroup
                );
                console.log(parsed)
            });
        });

        this.code.innerHTML = parsed;
    }
}
