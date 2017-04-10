// InteractionResponseGenerator_1_0_0

function InteractionResponseGenerator_1_0_0(widgetMap)
{
    this.widgetMap = widgetMap;

    this.responseParts = null;

    this.response = null;
}

InteractionResponseGenerator_1_0_0.prototype.getResponse = function()
{
    return this.response;
};

InteractionResponseGenerator_1_0_0.prototype.begin = function()
{
    this.responseParts = [];
};

InteractionResponseGenerator_1_0_0.prototype.end = function()
{
    this.response =
    {
        "version": "1.0.0",
        "id": this.requestId.toString(),
        "parts": this.responseParts
    };
};

InteractionResponseGenerator_1_0_0.prototype.generateId = function(id)
{
    this.requestId = id;
};

InteractionResponseGenerator_1_0_0.prototype.generateTitle = function(title)
{
    // Nothing to do
};

InteractionResponseGenerator_1_0_0.prototype.generateStaticText = function(id, text)
{
    // Nothing to do
};

InteractionResponseGenerator_1_0_0.prototype.generateTextInput = function(id, label, sensitive)
{
    var field = this.widgetMap[id];
    var value = field.value;

    this.responseParts.push({id:id, value:value});
};

InteractionResponseGenerator_1_0_0.prototype.generateChoices = function(id, label, choices, defaultChoiceId, suggestedWidgetType)
{
    var group = this.widgetMap[id];

    switch (suggestedWidgetType)
    {
        // Short lists
        case "radiobutton":
        case "list-box":  // TODO
        default:
            group = this._generateRadiobuttonChoices(id, label, choices);
            break;

        // Long lists
        case "combo-box":
        case "drop-down-menu":  // TODO
            group = this._generateMenuChoices(id, label, choices);
            break;
    }
};

InteractionResponseGenerator_1_0_0.prototype._generateRadiobuttonChoices = function(id, label, choices)
{
    var group = this.widgetMap[id];

    // Find the selected choice
    var choicesCount = choices.length;
    for (var choicesIndex = 0; choicesIndex < choicesCount; choicesIndex++)
    {
        var choice = choices[choicesIndex];
        var choiceId = choice.id;
        var radiobutton = this.widgetMap[choiceId];
        if (radiobutton.checked)
        {
            this.responseParts.push({id:id, value:choiceId});
            return;
        }
    }
};

InteractionResponseGenerator_1_0_0.prototype._generateMenuChoices = function(id, label, choices)
{
    var menu = this.widgetMap[id];
    var choiceId = menu.value;

    this.responseParts.push( {id:id, value:choiceId} );
};
