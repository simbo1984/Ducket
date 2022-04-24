import { Mongo } from 'meteor/mongo';
import { InsertLink } from "./links";
import * as uuid from 'uuid';

export function ParseMarkdown(markdownText) {

  const sourceId = new Mongo.ObjectID();
  const regex = new RegExp('\\r\\n|\\n', 'g')

  const entries = markdownText.split(regex).map(CreateBaseObject);
  const links = entries.map(CreateLinkObject);

  links.forEach((link) => InsertLink(link, sourceId));

  return sourceId;
}

function CreateBaseObject(entry) {

  const regex = new RegExp('(?<=#)\\s|\\[|\\]\\(|\\)<br>', 'g')

  let isLink;
  let refObject = {
    elementId: uuid.v4()
  };

  let linkElements = entry.split(regex).filter(item => item != "");

  linkElements.forEach((element, index) => {
    if (index === 0) {
      refObject.level = element.lastIndexOf('#');
      if (refObject.level !== -1) {
        isLink = false;
      } else {
        isLink = true;
        refObject.name = element;
      }
    } else {
      if (isLink) {
        refObject.url = element;
      } else {
        refObject.name = element;
        refObject.url = null;
      }
    }
  });

  entry = refObject;
  return entry;
}

function CreateLinkObject(entry, index, array) {

  let previousEntry = array[index - 1];

  switch (entry.level) {
    case 0:
      entry.parentId = null;
      return entry;

    case -1:
      if (entry.level === previousEntry.level) {
        entry.parentId = previousEntry.parentId;

      } else {
        entry.parentId = previousEntry.elementId;

      }

      return entry;

    default:
      if (entry.level > previousEntry.level && previousEntry.level !== -1) {
        entry.parentId = previousEntry.elementId;

      } else if (entry.level > previousEntry.level && previousEntry.level === -1) {    
        let parentItem = array.find(item => item.elementId === previousEntry.parentId)
        if (entry.level > parentItem.level) {
          entry.parentId = parentItem.elementId;

        } else if (entry.level < parentItem.level) {
          entry.parentId = FindParentId(entry, parentItem, array)

        } else {
          entry.parentId = parentItem.parentId;

        }

      } else if (entry.level === previousEntry.level) {
        entry.parentId = previousEntry.parentId;

      } else {
        entry.parentId = previousEntry.elementId;

      }

      return entry;
  }
}

function FindParentId(entry, parent, array) {
  let currentParent = parent;

  while (entry.level != currentParent.level) {
    currentParent = array.find(item => item.elementId === currentParent.parentId);
  }

  return currentParent.parentId;
}