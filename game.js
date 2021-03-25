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
      let body = $('<tbody>')
      $('table').addClass('table')
      for (let i = 0; i < tableData.length; i++) {
        let row = $('<tr>')

        for (let j = 0; j < tableData.length; j++) {
          const input = $(`<input type="text" data-i=${i} data-j=${j} disabled value="${tableData[i][j].value}" id="${tableData[i][j].name}">`)
          const td = $('<td>').append(input)
          row.append(td)

          td.on('click', function () {
            const targetedInput = $(this.children)
            targetedInput.removeAttr('disabled')

            targetedInput.on('keypress', function (e) {
              if (e.which === 13) {
                targetedInput.prop('disabled', true);
                matrix[targetedInput.data().i][targetedInput.data().j].value = targetedInput.val()
                updateTableData(JSON.stringify(matrix))
              }
            });
          })
        }
        body.append(row)
      }
      $('.table').append(body)

      createSortButtons(tableData)
    }

    function createSortButtons(tableData) {

      let row = $('<tr>')
      for (let i = 0; i < tableData.length; i++) {
        let buttonDown = $(`<button>Убывание</button>`)
        let buttonUp = $(`<button>Возрастание</button>`)

        buttonDown.on('click', function () {
          sortTable(i, 'down')
        })
        buttonUp.on('click', function () {
          sortTable(i, 'up')
        })

        let td = $('<td>')
        td.append(buttonDown, buttonUp)
        row.append(td)
      }
      let head = $('<thead>')
      head.append(row)
      $('.table').prepend(head)
    }

    function sortTable(col, direction) {
      let tbody = $('.table tbody');

      tbody.find('tr').sort(function (a, b) {
        let tda = $(a).find(`td:eq(${col}) input`).val();
        let tdb = $(b).find(`td:eq(${col}) input`).val();

        if (direction === 'down') {
          return +tda < +tdb ? 1 :
            +tda > +tdb ? -1 :
            0;
        } else if (direction === 'up') {
          return +tda > +tdb ? 1 :
            +tda < +tdb ? -1 :
            0;
        }
      }).appendTo(tbody);
    }

    let matrix = null
    $.get('getData.php', function (data) {

      if (data == "empty") {
        const size = prompt("Данные в БД отсутствуют. Введите размер таблицы")
        matrix = createMatrix(+size)
        saveTableData(JSON.stringify(matrix))
      } else {
        const result = JSON.parse(JSON.parse(data)[0]['data'])
        matrix = result
      }
      createTable(matrix, $('body'))
    })

    function saveTableData(data) {
      $.ajax({
        url: "saveData.php",
        type: "POST",
        data: {
          data
        },
        success: function (response) {}
      })
    }

    function updateTableData(data) {
      $.ajax({
        url: "updateTable.php",
        type: "POST",
        data: {
          data
        },
        success: function (response) {}
      })
    }

  }
})(jQuery);