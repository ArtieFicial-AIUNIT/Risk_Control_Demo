import { AppLayout } from '../components/AppLayout';
import { PageContent } from '@ag.ds-next/react/content';
import { DocumentTitle } from '../components/DocumentTitle';
import { RiskAssessment } from '../components/RiskAssessment';

const AssessmentPage = () => {
  return (
    <AppLayout>
      <DocumentTitle title="AI Risk Assessment" />
      <PageContent>
        <RiskAssessment />
      </PageContent>
    </AppLayout>
  );
};

export default AssessmentPage;
