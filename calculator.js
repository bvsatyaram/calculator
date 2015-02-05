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
    if ($('#main_input').html() == Calculator.defaultText) {
      Calculator.previousOperation = operation;
      var previewString = $('#preview_input').html();
      $('#preview_input').html(previewString.substring(0, previewString.length - 1));
      Calculator.appendToPreviewInput(operation);
    } else {
      Calculator.performCalculation();
      Calculator.appendToPreviewInput(operation);
      Calculator.previousOperation = operation;
      $('#main_input').html(Calculator.defaultText);
    }
  },
  inputDot: function() {
    var existingVal = $('#main_input').html();
    if (existingVal == Calculator.defaultText) {
      Calculator.inputDigit('0');
      Calculator.inputDigit('.');
    } else if (existingVal.match(/\./)) {
      // Do nothing, as there is already one decimal in the input
    } else {
      Calculator.inputDigit('.');
    }
  },
  setInputs: function(val) {
    $('#main_input').html(val);
    $('#preview_input').html(val);

  },
  deleteInput: function() {
    var existingVal = $('#main_input').html();
    var previewString = $('#preview_input').html();
    if (existingVal == Calculator.defaultText) {
      // Nothing to delete
    } else if (existingVal.length == 1) {
      $('#main_input').html(Calculator.defaultText);
      if ($('#preview_input').html().length == 1) {
        $('#preview_input').html(Calculator.defaultText);
      } else {
        $('#preview_input').html(previewString.substring(0, previewString.length - 1));
      }
    } else {
      $('#main_input').html(existingVal.substring(0, existingVal.length - 1));
      $('#preview_input').html(previewString.substring(0, previewString.length - 1));
    }
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

    $('#dot').click(function(){
      Calculator.inputDot();
    });

    $('#delete').click(function(){
      Calculator.deleteInput();
    });

    $('#reset').click(function() {
      Calculator.reset();
    });
  }
};

$( document ).ready(function() {
  Calculator.init();
});