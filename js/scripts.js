$(document).ready(function() {
    /* Mouseover on td (cell highlight) */
    $('.contentTable td:nth-last-child(-n+24)').on('mouseover', function() {
        $(this).addClass('cellHighlight');
        $(this).closest('section').find('table:first').find('th:nth-child(' + ($(this).index() + 1) + ')').addClass('cellHighlight');
        $(this).closest('table').find('tr:nth-child(' + ($(this).closest("tr").index() + 1) + ')').find('th:first').addClass('cellHighlight');
    });
    $('.contentTable td:nth-last-child(-n+24)').on('mouseout', function() {
        $(this).removeClass('cellHighlight');
        $(this).closest('section').find('table:first').find('th:nth-child(' + ($(this).index() + 1) + ')').removeClass('cellHighlight');
        $(this).closest('table').find('tr:nth-child(' + ($(this).closest("tr").index() + 1) + ')').find('th:first').removeClass('cellHighlight');
    });

    /* Mouseover th (whole column highlight) */
    $('.headersTable th:nth-last-child(-n+24)').on('mouseover', function() {
        $(this).addClass('cellHighlight');
        $(this).closest('section').find('div.contentTable').find('th').addClass('cellHighlight');
        $(this).closest('section').find('div.contentTable').find('td:nth-child(' + ($(this).index() + 1) + ')').addClass('cellHighlight');
    });
    $('.headersTable th:nth-last-child(-n+24)').on('mouseout', function() {
        $(this).removeClass('cellHighlight');
        $(this).closest('section').find('div.contentTable').find('th').removeClass('cellHighlight');
        $(this).closest('section').find('div.contentTable').find('td:nth-child(' + ($(this).index() + 1) + ')').removeClass('cellHighlight');
    });

    function selectCell(element, value) {
        if (($(element).hasClass('cellSelected') || $(element).hasClass('planned')) && !$(element).hasClass('validated')) {
            $(element).toggleClass('cellSelected', value);
        }
    };

    function validateAction(element) {
        if (!$(element).hasClass('validated') && $(element).hasClass('planned')) {
            $(element).addClass('validated');
            /* Do not forget to remove all selection after validation */
            $(document).find('.cellSelected').removeClass('cellSelected');
        }
    };

    /* Indicates that the user is allowed to select multiple cells at once */
    var allowMultipleCellSelection = true;

    /* Indicates that the user is allowed to select cells from different hour ranges */
    var allowMultipleColumnSelection = false;

    /* Clic on td (cell selection) */
    $('.contentTable td:nth-last-child(-n+24)').click(function() {
        /* Will select cells that are not selected and where something is actually planned */
        var select = !$(this).hasClass('cellSelected') && $(this).hasClass('planned');

        if (select) {
            /* If multiple cell selection is not allowed, unselect all cells */
            if (!allowMultipleCellSelection) {
                $(this).closest('section').find('div.contentTable').find('td').removeClass('cellSelected');
            }

            /* Else, if multiple column selection is not allowed, unselect cells from other columns */
            else if (!allowMultipleColumnSelection) {
                $(this).closest('section').find('div.contentTable').find('td:not(:nth-child(' + ($(this).index() + 1) + '))').removeClass('cellSelected');
            }
        }

        selectCell(this);
    });

    /* Clic on td (column selection) */
    $('.headersTable th:nth-last-child(-n+24)').click(function() {
        if (allowMultipleCellSelection) {
            /* Will select columns where actions are actually planned */
            var select = $(this).closest('section').find('div.contentTable').find('td:nth-child(' + ($(this).index() + 1) + ')').hasClass('planned');

            if (select) {
                /* If there is at least one element that's planned and not selected, select all, otherwise unselect all */
                var value = $(this).closest('section').find('div.contentTable').find('td:nth-child(' + ($(this).index() + 1) + ').planned:not(.cellSelected)').length > 0;
                $(this).closest('section').find('div.contentTable').find('td:nth-child(' + ($(this).index() + 1) + ')').each(function(index, element) {selectCell(element, value);});

                /* If multiple column selection is not allowed, unselect cells from other columns */
                if (!allowMultipleColumnSelection) {
                    $(this).closest('section').find('div.contentTable').find('td:not(:nth-child(' + ($(this).index() + 1) + '))').removeClass('cellSelected');
                }
            }
        }
    });

    /* Double click on td (cell validation) */
    $('.contentTable td:nth-last-child(-n+24)').dblclick(function() {
        validateAction(this);
    });

    /* Double click on th (column validation) */
    $('.headersTable th:nth-last-child(-n+24)').dblclick(function() {
        if (allowMultipleCellSelection) {
            $(this).closest('section').find('div.contentTable').find('td:nth-child(' + ($(this).index() + 1) + ').planned:not(.validated)').each(function(index, element) {validateAction(element);;});
        }
    });
});