import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'customers',
                loadChildren: './jmenuback/customers/customers.module#JmenubackCustomersModule'
            },
            {
                path: 'membership',
                loadChildren: './jmenuback/membership/membership.module#JmenubackMembershipModule'
            },
            {
                path: 'employee',
                loadChildren: './jmenuback/employee/employee.module#JmenubackEmployeeModule'
            },
            {
                path: 'timesheet',
                loadChildren: './jmenuback/timesheet/timesheet.module#JmenubackTimesheetModule'
            },
            {
                path: 'schedule',
                loadChildren: './jmenuback/schedule/schedule.module#JmenubackScheduleModule'
            },
            {
                path: 'employee-comment',
                loadChildren: './jmenuback/employee-comment/employee-comment.module#JmenubackEmployeeCommentModule'
            },
            {
                path: 'business',
                loadChildren: './jmenuback/business/business.module#JmenubackBusinessModule'
            },
            {
                path: 'location',
                loadChildren: './jmenuback/location/location.module#JmenubackLocationModule'
            },
            {
                path: 'menu-types',
                loadChildren: './jmenuback/menu-types/menu-types.module#JmenubackMenuTypesModule'
            },
            {
                path: 'food-items',
                loadChildren: './jmenuback/food-items/food-items.module#JmenubackFoodItemsModule'
            },
            {
                path: 'ingredients',
                loadChildren: './jmenuback/ingredients/ingredients.module#JmenubackIngredientsModule'
            },
            {
                path: 'happy-hour',
                loadChildren: './jmenuback/happy-hour/happy-hour.module#JmenubackHappyHourModule'
            },
            {
                path: 'menu-categorie',
                loadChildren: './jmenuback/menu-categorie/menu-categorie.module#JmenubackMenuCategorieModule'
            },
            {
                path: 'orders',
                loadChildren: './jmenuback/orders/orders.module#JmenubackOrdersModule'
            },
            {
                path: 'tables',
                loadChildren: './jmenuback/tables/tables.module#JmenubackTablesModule'
            },
            {
                path: 'charge',
                loadChildren: './jmenuback/charge/charge.module#JmenubackChargeModule'
            },
            {
                path: 'print',
                loadChildren: './jmenuback/print/print.module#JmenubackPrintModule'
            },
            {
                path: 'customer-reviwes',
                loadChildren: './jmenuback/customer-reviwes/customer-reviwes.module#JmenubackCustomerReviwesModule'
            },
            {
                path: 'employe-salary',
                loadChildren: './jmenuback/employe-salary/employe-salary.module#JmenubackEmployeSalaryModule'
            },
            {
                path: 'payment',
                loadChildren: './jmenuback/payment/payment.module#JmenubackPaymentModule'
            },
            {
                path: 'order-comment',
                loadChildren: './jmenuback/order-comment/order-comment.module#JmenubackOrderCommentModule'
            },
            {
                path: 'pre-defined-order-comments',
                loadChildren:
                    './jmenuback/pre-defined-order-comments/pre-defined-order-comments.module#JmenubackPreDefinedOrderCommentsModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IonEntityModule {}
