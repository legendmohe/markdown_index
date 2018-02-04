import { workspace } from "vscode";

/**
 * The main class to add markdown index.
 */
export class MarkdownIndex {

  // index base configuration for user
  private _indexBase: string;

  constructor() {
      // load the configuration
      const configuration = workspace.getConfiguration("markdownIndex"); 
      this._indexBase = configuration.get<string>("indexBase");
      if (this._indexBase != "#" && this._indexBase != "##") {
          this._indexBase = "#";
      }
  }

  private _addPrefix(line: string, prefix: string, markCount: number) {
      // remove previous index
      let markIndex = line.indexOf("#");
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

  private _countStartsWith(fliter, chars: string[]): number {
      let count: number = 0;
      chars.some(element => {
          if (fliter(element)) {
              count++;
              return false;
          } else {
              return true;
          }
      });
      return count;
  }

  private _addIndex(content: string[], lastMarkCount: number, prefix: string, cursor: number): number {
      // leave the normal line and count #
      let targetMarkCount = 0;
      // mark the current line whether is in the ``` code area
      let isInCodeArea = 0;
  
      while (cursor < content.length) {
          let line = content[cursor].trim();
          if (line.startsWith("```")) {
              isInCodeArea = isInCodeArea == 0 ? 1 : 0;
              cursor++;
              continue;
          }
  
          if (isInCodeArea == 0 && line.startsWith(this._indexBase)) {
              targetMarkCount = this._countStartsWith(
                  x => { return x == "#" },
                  line.split("")
              );
              break;
          }
          cursor++;
          
      }
  
      let seq = 1;
      while (cursor < content.length) {
          let markCount = this._countStartsWith(
              x => { return x == "#" },
              content[cursor].trim().split("")
          );
          if (markCount == targetMarkCount && markCount > lastMarkCount) {
              let curPrefix = prefix + seq + ".";
              content[cursor] = this._addPrefix(content[cursor], curPrefix, markCount);
              seq++;
              // deep first search
              cursor = this._addIndex(content, markCount, curPrefix, cursor + 1);
          } else if (markCount <= lastMarkCount) {
              // rollback 1 row
              cursor--;
              break;
          }
          cursor++;
      }
      return cursor;
  }

  public addMarkdownIndex(content: string[]) {
      this._addIndex(content, 0, "", 0);
      return content;
  }
}
