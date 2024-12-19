import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacsLandAllotmentphasetwoComponent } from '../adminModule/components/pacs-land-allotmentphasetwo/pacs-land-allotmentphasetwo.component';
import { PacsLandallotmentphaseThreeInsComponent } from '../adminModule/components/pacs-landallotmentphase-three-ins/pacs-landallotmentphase-three-ins.component';
import { PacsLandallotmentphaseThreeRptComponent } from '../adminModule/components/pacs-landallotmentphase-three-rpt/pacs-landallotmentphase-three-rpt.component';
import { PlaStateReportComponent } from '../adminModule/components/pacsLandAllotment/pla-state-report/pla-state-report.component';
import { AuthGuard } from '../guards/auth.guard';
import { FinishingLevelDeeComponent } from './components/construction/finishing-level-dee/finishing-level-dee.component';
import { FoundationLevelDeeComponent } from './components/construction/foundation-level-dee/foundation-level-dee.component';
import { SuperStructureLevelDeeComponent } from './components/construction/super-structure-level-dee/super-structure-level-dee.component';
import { SharedComponent } from './components/shared/shared.component';
import { SiteInspectionDeeComponent } from './components/site-inspection-dee/site-inspection-dee.component';
import { DeleteDetailsPhaseWhiseComponent } from '../adminModule/components/delete-details-phase-whise/delete-details-phase-whise.component';

const roles = ['503','504'];
const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: '',
        redirectTo: 'siteInspection',
        pathMatch: 'full',
      },
      {
        path: 'siteInspection',
        component: SiteInspectionDeeComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'foundationLevel',
        component: FoundationLevelDeeComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'superStructureLevel',
        component: SuperStructureLevelDeeComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'finishingLevel',
        component: FinishingLevelDeeComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsLandAllotmentStateReport',
        component: PlaStateReportComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      
      {
        path: 'pacsAllotmentphaseT',
        component: PacsLandAllotmentphasetwoComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsLandAllotmentphaserpt3',
        component: PacsLandallotmentphaseThreeRptComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'WrongentersDetails',
        component: DeleteDetailsPhaseWhiseComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeeRoutingModule { }
