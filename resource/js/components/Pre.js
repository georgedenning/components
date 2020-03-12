import $ from 'jquery';
import Code from './Code';

export default class Pre {
    
    /**
     * Create a new Pre instance
     * @param {HTMLObject} pre 
     */
    constructor(pre) {
        this.pre = pre;

        $(pre).find('code').each((index, element) => {
            element.innerHTML = this.indent(element);
            (new Code(element)).highlight();
        });

    }

    /**
     * Fixes the indentation of a code block
     * inside the pre tag
     */
    indent(block) {
        let lines = block.innerHTML.split("\n");

        while (! lines[0].trim()) {
            lines.splice(0, 1);
        }

        while (! lines[lines.length -1].trim()) {
            lines.splice(lines.length -1, 1);
        }

        const indent = lines[0].search(/\S/);

        for (const [index, line] of lines.entries()) {
            lines[index] = line.slice(indent);
        }

        return lines.join("\n");
    }
}
