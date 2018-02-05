'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MarkdownIndex } from './MarkdownIndex';

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

        // apply plugin
        const markdownIndex = new MarkdownIndex();
        markdownIndex.addMarkdownIndex(lines);

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