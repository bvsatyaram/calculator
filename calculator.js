var Calculator = {
  defaultText: '&nbsp;',
  previousInput: null,
  previousOperation: null,
  appendToInput: function(input, character) {
    if (input.html() == Calculator.defaultText) {
      input.html(character);
    } else {
      input.append(character);
    }
  },
  appendToMainInput: function(character) {
    Calculator.appendToInput($('#main_input'), character);
  },
  appendToPreviewInput: function(character) {
    Calculator.appendToInput($('#preview_input'), character);
  },
  inputDigit: function(digit) {
    Calculator.appendToMainInput(digit);
    Calculator.appendToPreviewInput(digit);
  },
  inputOperation: function(operation) {
    Calculator.performCalculation();
    Calculator.appendToPreviewInput(operation);
    Calculator.previousOperation = operation;
    $('#main_input').html(Calculator.defaultText);
  },
  setInputs: function(val) {
    $('#main_input').html(val);
    $('#preview_input').html(val);

  },
  reset: function() {
    Calculator.setInputs(Calculator.defaultText);
    Calculator.previousInput = 0;
    Calculator.previousOperation = '+';
  },
  performCalculation: function() {
    var previousVal = parseFloat(Calculator.previousInput);
    var currentVal = parseFloat($('#main_input').html());
    var result;
    switch(Calculator.previousOperation) {
    case '+':
      result = previousVal + currentVal;
      break;
    case '-':
      result = previousVal - currentVal;
      break;
    case 'x':
      result = previousVal * currentVal;
      break;
    case '/':
      result = previousVal / currentVal;
      break;
    }
    Calculator.previousInput = result;
    return result;
  },
  init: function() {
    Calculator.reset();

    $('.digit').click(function(){
      Calculator.inputDigit($(this).text());    
    });

    $('.operation').click(function(){
      Calculator.inputOperation($(this).text());
    });

    $('#equals').click(function(){
      var result = Calculator.performCalculation();
      Calculator.setInputs(result);
    });

    $('#reset').click(function() {
      Calculator.reset();
    });
  }
};

$( document ).ready(function() {
  Calculator.init();
});