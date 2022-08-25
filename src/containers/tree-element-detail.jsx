import React, { useState } from 'react';
import { _searchText, _links } from './tree-nav';

export const TreeElementDetail = ({ link }) => {

    function createPath() {
        var path = "";
        var elementName;
        const divider = "\\"
        var currentParentId = link.parentId;

        while (currentParentId !== null) {
            elementName = getElementName(currentParentId);
            path = path.concat(divider, elementName);
            currentParentId = findParent(currentParentId);
        }

        return path;
    }

    function findParent(parentId) {
        return _links.find(element => element.elementId === parentId).parentId;
    }

    function getElementName(elementId) {
        return _links.find(element => element.elementId === elementId).name;
    }

    if (_searchText.length > 0) {
        return (
            <div className='link-detail'>{createPath(link)}</div>
        )  
    } else {
        return (null)
    }


}