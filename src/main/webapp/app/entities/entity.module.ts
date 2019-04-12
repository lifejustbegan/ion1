import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Ion1CustomersModule } from './customers/customers.module';
import { Ion1MembershipModule } from './membership/membership.module';
import { Ion1EmployeeModule } from './employee/employee.module';
import { Ion1TimesheetModule } from './timesheet/timesheet.module';
import { Ion1ScheduleModule } from './schedule/schedule.module';
import { Ion1EmployeeCommentModule } from './employee-comment/employee-comment.module';
import { Ion1BusinessModule } from './business/business.module';
import { Ion1LocationModule } from './location/location.module';
import { Ion1MenuTypesModule } from './menu-types/menu-types.module';
import { Ion1FoodItemsModule } from './food-items/food-items.module';
import { Ion1IngredientsModule } from './ingredients/ingredients.module';
import { Ion1HappyHourModule } from './happy-hour/happy-hour.module';
import { Ion1MenuCategorieModule } from './menu-categorie/menu-categorie.module';
import { Ion1OrdersModule } from './orders/orders.module';
import { Ion1TablesModule } from './tables/tables.module';
import { Ion1ChargeModule } from './charge/charge.module';
import { Ion1PrintModule } from './print/print.module';
import { Ion1CustomerReviwesModule } from './customer-reviwes/customer-reviwes.module';
import { Ion1EmployeSalaryModule } from './employe-salary/employe-salary.module';
import { Ion1PaymentModule } from './payment/payment.module';
import { Ion1OrderCommentModule } from './order-comment/order-comment.module';
import { Ion1PreDefinedOrderCommentsModule } from './pre-defined-order-comments/pre-defined-order-comments.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Ion1CustomersModule,
        Ion1MembershipModule,
        Ion1EmployeeModule,
        Ion1TimesheetModule,
        Ion1ScheduleModule,
        Ion1EmployeeCommentModule,
        Ion1BusinessModule,
        Ion1LocationModule,
        Ion1MenuTypesModule,
        Ion1FoodItemsModule,
        Ion1IngredientsModule,
        Ion1HappyHourModule,
        Ion1MenuCategorieModule,
        Ion1OrdersModule,
        Ion1TablesModule,
        Ion1ChargeModule,
        Ion1PrintModule,
        Ion1CustomerReviwesModule,
        Ion1EmployeSalaryModule,
        Ion1PaymentModule,
        Ion1OrderCommentModule,
        Ion1PreDefinedOrderCommentsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ion1EntityModule {}
