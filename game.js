(function ($) {
  $.fn.game = function () {

    function randomHash() {
      return Math.random().toString(36).substr(2, 5);
    }

    function createMatrix(size) {
      let matrix = []
      for (let i = 0; i < size; i++) {
        matrix[i] = []
        for (let j = 0; j < size; j++) {
          matrix[i][j] = {
            name: randomHash(),
            value: '1'
          }
        }
      }
      return matrix
    }

    function createTable(tableData, target) {
      target.append('<table>')
      $('table').addClass('table')
      for (let i = 0; i < tableData.length; i++) {
        let row = $('<tr>')

        for (let j = 0; j < tableData.length; j++) {
          const input = $(`<input type="text" disabled value="${tableData[i][j].value}" id="${tableData[i][j].name}">`)
          const td = $('<td>').append(input)
          row.append(td)

          td.on('click', function () {
            const targetedInput = $(this.children)
            targetedInput.removeAttr('disabled')

            targetedInput.on('keypress', function (e) {
              if (e.which === 13) {
                targetedInput.prop('disabled', true);
              }
            });
          })
        }

        $('.table').append(row)
      }
    }

    const matrix = createMatrix(6)

    console.log(matrix)
    createTable(matrix, this)

  }
})(jQuery);