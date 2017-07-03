'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "legendmohe" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.addMarkdownIndex', () => {
        // The code you place here will be executed every time your command is executed

        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No open text editor');
            return; // No open text editor
        }

        var selection = editor.selection;
        var text = editor.document.getText(selection);
        var lines: string[];
        if (text.length == 0) {
            // use all text if no selection
            lines = editor.document.getText().split("\n");
            selection = new vscode.Selection(0, 0, lines.length, 0);
        } else {
            lines = text.split("\n");
        }
        addMarkdownIndex(lines);
        editor.edit(function (builder: vscode.TextEditorEdit) {
            var resultText = lines.join("\n");
            builder.replace(new vscode.Range(selection.start, selection.end), resultText);
        })
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function addPrefix(line: string, prefix: string, markCount: number) {
    // remove previous index
    var markIndex = line.indexOf("#");
    if (markIndex == -1) {
        markIndex = 0;
    }
    line = line.replace(/\s*((\d\.?)+)\s*/g, "");
    return line.substr(0, markIndex + markCount)
        + " "
        + prefix
        + " "
        + line.substr(markIndex + markCount).trim();
}

function countStartsWith(fliter, chars: string[]): number {
    var count: number = 0;
    chars.some(function (element) {
        if (fliter(element)) {
            count++;
            return false;
        } else {
            return true;
        }
    })
    return count;
}

function addIndex(content: string[], lastMarkCount: number, prefix: string, cursor: number): number {
    // leave the normal line and count #
    var targetMarkCount = 0;
    while (cursor < content.length) {
        var line = content[cursor].trim();
        if (line.startsWith("#")) {
            targetMarkCount = countStartsWith(
                function (x) { return x == "#" },
                line.split("")
            );
            break;
        } else {
            cursor++;
        }
    }

    var seq = 1;
    while (cursor < content.length) {
        var markCount = countStartsWith(
            function (x) { return x == "#" },
            content[cursor].trim().split("")
        );
        if (markCount == targetMarkCount && markCount > lastMarkCount) {
            var curPrefix = prefix + seq + ".";
            content[cursor] = addPrefix(content[cursor], curPrefix, markCount);
            seq++;
            // deep first search
            cursor = addIndex(content, markCount, curPrefix, cursor + 1);
        } else if (markCount <= lastMarkCount) {
            // rollback 1 row
            cursor--;
            break;
        }
        cursor++;
    }
    return cursor;
}

function addMarkdownIndex(content: string[]) {
    addIndex(content, 0, "", 0);
    return content;
}