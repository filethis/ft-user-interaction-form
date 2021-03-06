/*
Copyright 2018 FileThis, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* FileThis demo element */
/* Imports */
/**

This element defines a number of form examples

@demo
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/polymer/polymer-legacy.js';
import '../ft-user-interaction-form.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer
({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
            }
        </style>

        <div class="layout vertical center" style="padding-left:16px; padding-right: 16px;">

            <div class="layout horizontal start center" style="padding-left:16px; padding-right: 16px;">

                <iron-label style="font-family:Arial;padding-top:17px">
                    Examples of FileThis user interaction requests rendered by the &lt;ft-user-interaction-form&gt; element
                </iron-label>

                <!-- Spacer -->
                <div style="width:30px;"></div>

                <!-- Versions -->
                <paper-dropdown-menu label="Version" style="width:75px;" no-animations="true">
                    <paper-listbox class="dropdown-content" slot="dropdown-content" selected="{{_selectedVersionIndex}}">
                        <template is="dom-repeat" items="[[versions]]" as="version">
                            <paper-item>[[version]]</paper-item>
                        </template>
                    </paper-listbox>
                </paper-dropdown-menu>
            </div>

            <!-- Spacer -->
            <div style="height:30px;"></div>

            <div class="layout horizontal start center-justified" style="padding-left:16px; padding-right: 16px;">

                <!-- Credentials -->
                <div style="background:white; border: 1px solid #DDD;">
                    <ft-user-interaction-form id="credentialsForm"></ft-user-interaction-form>
                </div>

                <!-- Spacer -->
                <div style="width:30px;"></div>

                <!-- General Choices -->
                <div style="background:white; border: 1px solid #DDD;">
                    <ft-user-interaction-form id="generalChoicesForm"></ft-user-interaction-form>
                </div>

                <!-- Spacer -->
                <div style="width:30px;"></div>

                <!-- U.S. State -->
                <div style="background:white; border: 1px solid #DDD;">
                    <ft-user-interaction-form id="usStateForm"></ft-user-interaction-form>
                </div>
            </div>
        </div>
`,

  is: 'demo-fixture',

  properties:
  {
      versions:
      {
          type: Array,
          notify: true,
          value: [
              '1.0.0',
              '2.0.0'
          ]
      },

      selectedVersion:
      {
          type: String,
          notify: true,
          value: "2.0.0",
          observer: "_onSelectedVersionChanged"
      },

      _selectedVersionIndex:
      {
          type: Number,
          notify: true,
          value: "1",
          observer: "_onSelectedVersionIndexChanged"
      }
  },

  _onSelectedVersionChanged: function(to, from)
  {
      // Update the popup selection
      this._selectedVersionIndex = this._mapVersionToIndex(this.selectedVersion);
      
      // Update version used by forms
      this.$.credentialsForm.version = this.selectedVersion;
      this.$.generalChoicesForm.version = this.selectedVersion;
      this.$.usStateForm.version = this.selectedVersion;
      
      // Update request examples used by forms
      this._loadRequestExampleIntoForm("credentials", this.$.credentialsForm);
      if (this.selectedVersion === "1.0.0")
          this._loadRequestExampleIntoForm("generic-choices", this.$.generalChoicesForm);
      else
          this._loadRequestExampleIntoForm("general-choices", this.$.generalChoicesForm);
      this._loadRequestExampleIntoForm("us-state", this.$.usStateForm);
  },

  _mapVersionToIndex: function(version)
  {
      switch (version)
      {
          case "1.0.0":
              return 0;
          case "2.0.0":
              return 1;
          default:
              throw new Error("Unknown user interaction schema version: " + version);
      }
  },

  _onSelectedVersionIndexChanged: function()
  {
      switch (this._selectedVersionIndex)
      {
          case 0:
              this.selectedVersion = "1.0.0";
              break;
          case 1:
              this.selectedVersion = "2.0.0";
              break;
          default:
              throw new Error("Invalid version index: " + this._selectedVersionIndex.toString());
      }
  },

  _loadRequestExampleIntoForm: function(name, form)
  {
      var path = "data/user-interaction-request-" + name + "-example-" + this.selectedVersion + ".json";

      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.overrideMimeType("application/json");
      xmlHttpRequest.open('GET', path, true);
      xmlHttpRequest.onreadystatechange = function()
      {
          if (xmlHttpRequest.readyState === 4 &&
              xmlHttpRequest.status === 200)
          {
              form.request = JSON.parse(xmlHttpRequest.responseText);
          }
      };
      xmlHttpRequest.send();
  }
});
