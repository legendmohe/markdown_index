import { workspace } from "vscode";

/**
 * The main class to add markdown index.
 * 
 * Inspired by firjq (https://github.com/firejq/markdown_index/blob/master/src/MarkdownIndex.ts)
 * 
 * modify by legendmohe
 */
export class MarkdownIndex {

  // index base configuration for user, default value is "#"
  private _indexBase: string = "#";

  constructor() {
      // load the configuration
      const configuration = workspace.getConfiguration("markdownIndex"); 
      const configBase = configuration.get<string>("indexBase");
      if (configBase && configBase.length > 0) {
          this._indexBase = configBase;
      }
  }

  private _addPrefix(line: string, prefix: string, markCount: number) {
      // remove previous index
      let markIndex = line.indexOf(this._indexBase);
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
      // leave the normal line and count this._indexBase
      let targetMarkCount = 0;
      // mark the current line whether is in the ``` code area
      let isInCodeArea = false;

      while (cursor < content.length) {
          let line = content[cursor];

          if (line.startsWith("```")) {
            isInCodeArea = !isInCodeArea;
            cursor++;
            continue;
        }

          if (isInCodeArea == false && line.startsWith(this._indexBase)) {
              // find the start mark count
              targetMarkCount = this._countStartsWith(
                  x => { return x == this._indexBase },
                  line.split("")
              );
              break;
          }
          cursor++;
          
      }
  
      let seq = 1;
      while (cursor < content.length) {
          let markCount = this._countStartsWith(
              x => { return x == this._indexBase },
              content[cursor].split("")
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